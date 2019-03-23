package com.mshare;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.venepe.RNMusicMetadata.RNMusicMetadataPackage;
import com.guichaguri.trackplayer.TrackPlayer;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import expo.adapters.react.ModuleRegistryAdapter;
import expo.adapters.react.ReactAdapterPackage;
import expo.adapters.react.ReactModuleRegistryProvider;
import expo.core.interfaces.Package;
import expo.core.interfaces.SingletonModule;
import expo.modules.constants.ConstantsPackage;
import expo.modules.filesystem.FileSystemPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.medialibrary.MediaLibraryPackage;

import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(Arrays.<Package>asList(
     new ReactAdapterPackage(),
     new ConstantsPackage(),
     new PermissionsPackage(),
     new FileSystemPackage(),
     new MediaLibraryPackage()
  ), Arrays.<SingletonModule>asList());

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),

            new FBSDKPackage(mCallbackManager),
            new RNGestureHandlerPackage(),
            new RNMusicMetadataPackage(),
            new TrackPlayer(),
            new VectorIconsPackage(),
          new ModuleRegistryAdapter(mModuleRegistryProvider)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    FacebookSdk.sdkInitialize(getApplicationContext());
    // try {
    //   PackageInfo info = getPackageManager().getPackageInfo(
    //                     "com.facebook.samples.loginhowto", 
    //                     PackageManager.GET_SIGNATURES);
    //   for (Signature signature : inf12o.signatures) {
    //       MessageDigest md = MessageDigest.getInstance("SHA");
    //       md.update(signature.toByteArray());
    //       Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT));
    //       }
    //   } catch (NameNotFoundException e) {
              
    //   } ;
  }
}
